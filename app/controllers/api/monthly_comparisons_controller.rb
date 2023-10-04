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
      @monthly_comparison = current_user.monthly_comparisons.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Monthly comparison not found' }, status: :not_found
    end

    def monthly_comparison_params
      params.require(:monthly_comparison).permit(:month, :savings)
    end
  end
end
