module Api 
    class TransactionsController < ApplicationController
        before_action :authorize_user, only: [:index, :create, :destroy]
        before_action :find_transaction, only: [:destroy]
        
        def index
            begin
              @transactions = current_user.transactions
              render 'api/transactions/index', status: :ok
            rescue StandardError => e
              render json: { error: e.message }, status: :internal_server_error
            end
        end
          
        def create 
            @transaction = current_user.transactions.build(transaction_params)
          
            if @transaction.save
              render 'api/transactions/create', status: :created
            else
              render json: { error: @transaction.errors.full_messages }, status: :unprocessable_entity
            end
        end  

        def destroy 
            @transaction.destroy
            render json: { success: true }, status: :ok
        end

        def show_by_date 
            @transactions = current_user.transactions.where(date: params[:date])
            render 'api/transactions/show_by_date', status: :ok
        end

        private

        def find_transaction
            @transaction = current_session.user.transactions.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'Transaction not found' }, status: :not_found
        end

        def transaction_params
            amount = params[:transaction][:amount].to_f.round(2)
            params.require(:transaction).permit(:date, :amount, :description, :transaction_type)
        end          
    end
end

