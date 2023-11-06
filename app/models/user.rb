# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  webauthn_id            :string(255)
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_webauthn_id           (webauthn_id) UNIQUE
#
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :passkey_authenticatable

  has_many :passkeys

  validates :email, presence: true, uniqueness: true

  def self.passkeys_class
    Passkey
  end

  def self.find_for_passkey(passkey)
    self.find_by(id: passkey.user_id)
  end

  def after_passkey_authentication(passkey:) end
end

Devise.add_module :passkey_authenticatable,
                  model: 'devise/passkeys/model',
                  route: { session: [nil, :new, :create, :destroy] },
                  controller: 'controller/sessions',
                  strategy: true