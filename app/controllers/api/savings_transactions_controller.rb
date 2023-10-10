module Api
    class SavingsTransactionsController < ApplicationController
      before_action :authorize_user
      before_action :find_savings_transaction, only: [:show, :update, :destroy]
  
      def create
        @savings_transaction = current_user.savings_transactions.build(savings_transaction_params)
      
        if @savings_transaction.save 
        	update_goal_savings(@savings_transaction.goal_id, @savings_transaction.amount)
        	render 'api/savings_transactions/create', status: :created
        else
          # Handle validation errors
          render json: { error: @savings_transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def update
      	if @savings_transaction.update(savings_transaction_params)
        	render 'api/savings_transactions/update', status: :ok
          update_goal_savings(@savings_transaction.goal_id, @savings_transaction.amount)
        else
          render json: { error: @savings_transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def show
        render 'api/savings_transactions/show', status: :ok
      end
  
      def destroy
        @savings_transaction.destroy
        render json: { success: true }, status: :ok
      end
  
      private
  
      def find_savings_transaction
      	@savings_transaction = current_user.savings_transactions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
      	render json: { error: 'Savings Transaction not found' }, status: :not_found
      end

			def update_goal_savings(goal_id, amount)
				if goal_id.present?
					goal = current_user.goals.find_by(id: goal_id)
					progress_percentage = (@savings_transaction.amount / goal.amount) * 100.0
					goal.update(progress: progress_percentage)
					@savings_transaction.update(applied: true)
				end
			end
					
			def savings_transaction_params
				params.require(:savings_transaction).permit(:date, :amount, :description, :goal_id)
			end
		end
end
  