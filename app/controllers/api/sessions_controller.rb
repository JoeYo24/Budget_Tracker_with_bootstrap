module Api
    class SessionsController < ApplicationController
  
      def create
        @user = User.find_by(email: params[:user][:email])
  
        if @user && @user.authenticate(params[:user][:password])
          session = Session.create(user_id: @user.id, expires_at: Time.now + 1.week) # Set session expiration to 1 week from now
          render 'api/sessions/create', status: :created
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def keep_alive 
        session[:expires_at] = 15.minutes.from_now
        render json: { success: true }, status: :ok
      end
      
      def authenticated 
        token = request.headers['Authorization'].split(' ').last 
        session = Session.find_by(token: token) 

        if session && !session.expired? 
            @user = session.user 
            render 'api/sessions/authenticated', status: :ok 
        else 
            render json: { authenticated: false }, status: :unauthorized 
        end
        end

      def destroy
        session = Session.find_by(token: request.headers['Authorization'].split(' ').last)
  
        if !session
          return render json: { error: 'Invalid token' }, status: :unauthorized
        elsif session.expired?
          session.destroy
          render json: { error: 'Session expired' }, status: :unauthorized
        else
          session.destroy
          render json: { success: true }, status: :ok
        end
      end
    end
end