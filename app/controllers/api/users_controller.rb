module Api
    class UsersController < ApplicationController
      before_action :authorize_user, except: [:create]
  
      def create
        @user = User.create(user_params)
        if @user.valid?
          render 'api/users/create', status: :created
        else
          render json: { error: 'User could not be created' }, status: :bad_request
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :bad_request
      end
  
      def update
        @user = User.find_by(id: params[:id])
        return render json: { error: 'Cannot find user' }, status: :not_found unless @user
      
        if @user.id != current_user.id
          return render json: { error: 'User not authorized to update user' }, status: :unauthorized
        end
      
        if @user.update(update_user)
          render 'api/users/update', status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def show 
        @user = User.find_by(id: params[:id])
        return render json: { error: 'Cannot find user' }, status: :not_found unless @user
        render json: @user, status: :ok
      end

      def destroy
        @user = User.find_by(id: params[:id])
        return render json: { error: 'Cannot find user' }, status: :not_found unless @user
  
        if @user.id != current_session.user.id
          return render json: { errors: 'User not authorized to delete user' }, status: :unauthorized
        end
  
        @user.destroy
        render json: { success: true }, status: :ok
      end
  
      private
  
      def user_params 
        params.require(:user).permit(:email, :username, :password, :salary_after_tax)
      end

      def update_user 
        params.require(:user).permit(:email, :username, :salary_after_tax)
      end
    end
  end
  