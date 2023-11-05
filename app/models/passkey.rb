# == Schema Information
#
# Table name: passkeys
#
#  id           :bigint           not null, primary key
#  label        :string(255)
#  last_used_at :datetime
#  public_key   :string(255)
#  sign_count   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  external_id  :string(255)
#  user_id      :bigint           not null
#
# Indexes
#
#  index_passkeys_on_external_id  (external_id)
#  index_passkeys_on_public_key   (public_key)
#  index_passkeys_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Passkey < ApplicationRecord
  belongs_to :user
end
