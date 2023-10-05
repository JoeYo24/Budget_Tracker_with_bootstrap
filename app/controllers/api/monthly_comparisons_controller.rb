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
      # Attempt to find the monthly comparison
      @monthly_comparison = current_user.monthly_comparisons.find_or_initialize_by(month: params[:month])
    
      # Check if the record is a new, unsaved one (i.e., not found in the database)
      if @monthly_comparison.new_record?
        # Initialize default values, e.g., savings set to 0
        @monthly_comparison.savings = 0
      end
    
      # Save the record, whether it's newly created or not
      @monthly_comparison.save
    
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Monthly comparison not found' }, status: :not_found
    end
    

    def monthly_comparison_params
      params.require(:monthly_comparison).permit(:month, :savings)
    end
  end
end
