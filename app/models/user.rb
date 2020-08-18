class User < ApplicationRecord
    validates :username,
     :email,
      :elo,
       :password_digest,
        :session_token,
         presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true

    has_many :goals

    has_many :friends_requested,
        foreign_key: :central_user_id,
        class_name: :Friend

    has_many :friends_received,
        foreign_key: :foreign_user_id,
        class_name: :Friend
    
    has_many :games_begun,
        foreign_key: :central_user_id,
        class_name: :Game

    has_many :games_joined,
        foreign_key: :foreign_user_id,
        class_name: :Game

    attr_reader :password

    after_initialize :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end