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

        def destroy
            @goal = current_user.goals.find_by(id: params[:id])
          
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