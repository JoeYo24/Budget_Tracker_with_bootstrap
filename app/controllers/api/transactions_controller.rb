module Api
    class TransactionsController < ApplicationController
      before_action :authorize_user, only: [:index, :create, :destroy]
      before_action :find_transaction, only: [:destroy]
  
      # GET /api/transactions
      def index
        begin
          @transactions = current_user.transactions
          render 'api/transactions/index', status: :ok
        rescue StandardError => e
          render json: { error: e.message }, status: :internal_server_error
        end
      end
  
      # POST /api/transactions
      def create
        @transaction = current_user.transactions.build(transaction_params)

        if @transaction.save
          if params[:transaction_type] == 'Savings'
            if params[:goal_id].present?
              goal = current_user.goals.find(params[:goal_id])

              savings_transaction = SavingsTransaction.create(
                user_id: current_user.id,
                amount: @transaction.amount,
                description: @transaction.description,
                date: @transaction.date,
                goal_id: goal.id
              )
              
              if savings_transaction.persisted?
                puts "SavingsTransaction created successfully. ID: #{savings_transaction.id}"
              else
                puts "Failed to create SavingsTransaction. Errors: #{savings_transaction.errors.full_messages.join(', ')}"
              end
              
            else
              amount = @transaction.amount
              current_user.update(bank_savings: current_user.bank_savings + amount)
            end
          end
          calculate_and_update_savings_by_month
          render 'api/transactions/create', status: :created
        else
          render json: { error: @transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      # DELETE /api/transactions/:id
      def destroy
        @transaction.destroy
        render json: { success: true }, status: :ok
      end
  
      # GET /api/transactions/:date
      def show_by_date
        @transactions = current_user.transactions.where(date: params[:date])
        render 'api/transactions/show_by_date', status: :ok
      end
  
      private
  
      def find_transaction
        @transaction = current_user.transactions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Transaction not found' }, status: :not_found
      end
  
      def calculate_and_update_savings_by_month
        user = current_user
  
        # Find savings transactions within the current month
        month = @transaction.date.beginning_of_month
        end_of_month = month.end_of_month
        savings_transactions = user.transactions.where(
          transaction_type: 'Savings',
          date: month..end_of_month
        )
        # Calculate and update savings comparisons for the current month
        total_savings = savings_transactions.sum(:amount)
  
        monthly_comparison = user.monthly_comparisons.find_or_initialize_by(month: month)
        monthly_comparison.update(savings: total_savings)
      end
        
      def transaction_params
        params.require(:transaction).permit(:date, :amount, :description, :transaction_type, :goal_id)
      end
    end
  end