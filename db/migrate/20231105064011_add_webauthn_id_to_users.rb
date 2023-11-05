class AddWebauthnIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :webauthn_id, :string, after: :reset_password_token
    add_index :users, :webauthn_id, unique: true
  end
end
