module Api
    class SavingsTransactionsController < ApplicationController
      before_action :authorize_user
      before_action :find_savings_transaction, only: [:show, :update]
  
			def create
				@savings_transaction = current_user.savings_transactions.build(savings_transaction_params)
				render 'api/savings_transactions/create', status: :created if @savings_transaction.save

			end			
      
			def update
				if @savings_transaction.update(savings_transaction_params)
					update_goal_savings(@savings_transaction.goal_id, @savings_transaction.amount)
					render 'api/savings_transactions/update', status: :ok
				else
					destroy	render json: { error: @savings_transaction.errors.full_messages }, status: :unprocessable_entity
				end
			end			

			def index 
				begin
					@savings_transactions = current_user.savings_transactions
					render 'api/savings_transactions/index', status: :ok
				rescue StandardError => e
					render json: { error: e.message }, status: :internal_server_error
				end
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

			def savings_transaction_params
				params.require(:savings_transaction).permit(:date, :amount, :description, :goal_id)
			end
		end
end
  