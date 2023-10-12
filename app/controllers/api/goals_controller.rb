module Api 
	class GoalsController < ApplicationController
		before_action :authorize_user, only: [:index, :create, :destroy]

			def index 
				begin
					@goals = current_user.goals
					render 'api/goals/index', status: :ok
				rescue StandardError => e
					render json: { error: e.message }, status: :internal_server_error
				end
			end 

			def create 
				@goal = current_user.goals.build(goal_params)

				if @goal.save 
					render 'api/goals/create', status: :created 
				else
					render json: { error: @goal.errors.full_messages }, status: :unprocessable_entity
				end
			end 

			def update
				@goal = current_user.goals.find_by(id: params[:id])
			
				if @goal
					if @goal.update(goal_params)
						update_progress
						render 'api/goals/update', status: :ok
					else
						render json: { error: @goal.errors.full_messages }, status: :unprocessable_entity
					end
				else
					render json: { error: 'Goal not found' }, status: :not_found
				end
			end			

			def destroy
				@goal = current_user.goals.find_by(id: params[:id])
				def update_goal_savings(goal_id, amount)
				if goal_id.present?
					goal = current_user.goals.find_by(id: goal_id)
					progress_percentage = (amount / goal.amount) * 100.0
					goal.update(progress: progress_percentage)
					@savings_transaction.update(applied: true)
				end
			end
			if @goal
				@goal.destroy
				render json: { success: true }, status: :ok
			else
				render json: { error: 'Goal not found' }, status: :not_found
			end
		end  

		private 

		def goal_params 
			params.require(:goal).permit(:description, :amount)
		end
	end
end