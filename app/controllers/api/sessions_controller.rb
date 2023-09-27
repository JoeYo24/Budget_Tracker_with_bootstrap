module Api
    class SessionsController < ApplicationController
  
      def create
        user = User.authenticate(params[:user][:email], params[:user][:password])

        if user 
          session = Session.create(user_id: user.id, expires_at: 1.week.from_now) 
          render json: { token: session.token }, status: :created 
        else 
          render json: { error: 'Invalid email or password' }, status: :unauthorized 
        end
      end
      
      def keep_alive 
        session[:expires_at] = 15.minutes.from_now
        render json: { success: true }, status: :ok
      end
      
      def authenticated 
        session = Session.find_by(token: params[:token]) 

        if session && session.expires_at > Time.now
            @user = session.user 
            render 'api/sessions/authenticated', status: :ok 
        else 
            render json: { authenticated: false }, status: :unauthorized 
        end
      end

      def destroy
        session = Session.find_by(token: params[:token])
  
        if !session
          return render json: { error: 'Invalid token' }, status: :unauthorized
        elsif session.expires_at <= Time.now
          session.destroy
          render json: { error: 'Session expired' }, status: :unauthorized
        else
          session.destroy
          render json: { success: true }, status: :ok
        end
      end
    end
end