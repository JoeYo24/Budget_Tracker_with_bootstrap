module Api 
    class GoalsController < ApplicationController
        before_action :authorize_user, only: [:index, :create, :destroy]

        def index 
            @goals = current_session.user.goals
        end 

        def create 
            @goal = Goal.create(goal_params)
            render 'api/goals/create', status: :created 
        rescue ActiveRecord::RecordInvalid => e 
            render json: { error: e.message }, status: :unprocessable_entity
        end 

        def destroy
            @goal = current_session.user.goals.find_by(id: params[:id])
          
            if @goal
              @goal.destroy
              render json: { success: true }, status: :ok
            else
              render json: { error: 'Goal not found' }, status: :not_found
            end
        end  

        private 

        def goal_params 
            params.require(:goal).permit(:description, :amount, :target_date)
        end
    end
end