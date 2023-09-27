class ApplicationController < ActionController::Base
    def current_session
        return @current_session if defined?(@current_session) && @current_session_expires_at > Time.now
      
        token = request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
        @current_session = Session.find_by(token: token) if token.present?
        @current_session_expires_at = Time.now + 1.week # Adjust the expiration time as needed
        @current_session
    end      
  
    def authorize_user
      unless current_session
        render json: { error: 'Authentication required' }, status: :unauthorized
      end
    end
  
    def current_user
      @current_user ||= current_session.user if current_session
    end
  end
  
