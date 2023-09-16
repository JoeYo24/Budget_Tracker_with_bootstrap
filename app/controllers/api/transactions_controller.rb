module Api 
    class TransactionsController < ApplicationController
        before_action :authorize_user, only: [:index, :create, :destroy]
        before_action :find_transaction, only: [:destroy]

        def index 
            @transactions = current_session.user.transactions 
        end 

        def create 
            @transaction = Transaction.create(transaction_params)
            render 'api/transactions/create', status: :created
        rescue ActiveRecord::RecordInvalid => e
            render json: { error: e.message }, status: :unprocessable_entity
        end

        def destroy 
            @transaction.destroy
            render json: { success: true }, status: :ok
        end

        def show_by_date 
            @transactions = current_session.user.transactions.where(date: params[:date])
            render 'api/transactions/show_by_date', status: :ok'
        end

        private

        def find_transaction
            @transaction = current_session.user.transactions.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'Transaction not found' }, status: :not_found
        end

        def transaction_params
            params.require(:transaction).permit(:date, :amount, :description, :transaction_type)
        end
    end
end

