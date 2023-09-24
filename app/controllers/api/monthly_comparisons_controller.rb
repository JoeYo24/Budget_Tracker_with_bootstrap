module Api
    class MonthlyComparisonsController < ApplicationController
      before_action :authorize_user
      before_action :find_monthly_comparison, only: [:show, :update, :destroy]
  
      def index
        @monthly_comparisons = current_session.user.monthly_comparisons
      end
  
      def calculate_and_update_savings_by_month 
        user = current_session.user 
        
        savings_transactions = user.transactions.where(transaction_type: 'savings')
        savings_by_month = savings_transactions.group_by { |t| t.date.beginning_of_month }

        savings_by_month.each do |month, transactions| 
          total_savings = transactions.sum(&:amount) 

          monthly_comparison = user.monthly_comparisons.find_or_initialize_by(month: month)
          monthly_comparison.update(savings: total_savings) 
        end 
      end 
    end
  end
  