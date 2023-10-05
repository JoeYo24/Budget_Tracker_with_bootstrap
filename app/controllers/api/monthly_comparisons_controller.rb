module Api
  class MonthlyComparisonsController < ApplicationController
    before_action :authorize_user
    before_action :find_monthly_comparison

    def create 
      @monthly_comparison = current_user.monthly_comparisons.build(monthly_comparison_params)

      if @monthly_comparison.save
        render 'api/monthly_comparisons/create', status: :created
      else
        render json: { error: @monthly_comparison.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index
      @monthly_comparisons = current_user.monthly_comparisons
      puts @monthly_comparisons
      if @monthly_comparisons.empty?
        render json: { error: 'No monthly comparisons found' }, status: :not_found
      end
      render 'api/monthly_comparisons/index', status: :ok
    end

    def show
      render 'api/monthly_comparisons/show', status: :ok
    end

    def update
      if @monthly_comparison.update(monthly_comparison_params)
        render 'api/monthly_comparisons/update', status: :ok
      else
        render json: { error: @monthly_comparison.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @monthly_comparison.destroy
      render json: { success: true }, status: :ok
    end

    private

    def find_monthly_comparison
      puts "User Id: #{current_user.id}"
      @monthly_comparisons = current_user.monthly_comparisons.to_a
    
      # Ensure there are 12 monthly comparisons, one for each month
      current_month = Date.today.beginning_of_month
      (0..11).each do |i|
        target_month = current_month - i.months
        existing_comparison = @monthly_comparisons.find { |comparison| comparison.month == target_month }
    
        # If the comparison for the target month doesn't exist, create it
        if existing_comparison.nil?
          new_comparison = current_user.monthly_comparisons.build(month: target_month, savings: 0)
          new_comparison.save
          @monthly_comparisons << new_comparison
        end
      end
    
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Monthly comparison not found' }, status: :not_found
    end
    
    def monthly_comparison_params
      params.require(:monthly_comparison).permit(:month, :savings)
    end
  end
end
