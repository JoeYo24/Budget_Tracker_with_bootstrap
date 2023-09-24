class ApplicationController < ActionController::Base
    TOKEN_HEADER = 'Authorization'.freeze # Set the token header name
    def current_session
        return @current_session if defined?(@current_session) && @current_session_expires_at > Time.now
      
        token = request.headers['Authorization'].to_s.split(' ').last
        @current_session = Session.find_by(token: token) if token.present?
        @current_session_expires_at = Time.now + 15.minutes # Adjust the expiration time as needed
        @current_session
    end
          
    def authorize_user
        unless current_session
          render json: { error: 'Authentication required' }, status: :unauthorized
        end
    end
end
