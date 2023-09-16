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
      
        if @user.id != current_session.user.id
          return render json: { error: 'User not authorized to update user' }, status: :unauthorized
        end
      
        # Check if password is included in user_params
        if user_params.key?(:password)
          if user_params[:password].blank?
            return render json: { error: 'Password can\'t be blank' }, status: :unprocessable_entity
          elsif user_params[:password] != user_params[:password_confirmation]
            return render json: { error: 'Password and password confirmation do not match' }, status: :unprocessable_entity
          end
        end
      
        if @user.update(user_params)
          render 'api/users/update', status: :ok
        else
          render json: { error: 'User could not be updated' }, status: :unprocessable_entity
        end
      end
      
  
      def destroy
        @user = User.find_by(id: params[:id])
        return render json: { error: 'Cannot find user' }, status: :not_found unless @user
  
        if @user.id != current_session.user.id
          return render json: { error: 'User not authorized to delete user' }, status: :unauthorized
        end
  
        @user.destroy
        render json: { success: true }, status: :ok
      end
  
      private
  
      def user_params 
        params.require(:user).permit(:email, :password, :password_confirmation, :salary_after_tax)
      end
    end
  end
  