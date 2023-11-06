class TopsController < ApplicationController
  def index
    @passkeys = current_user.passkeys
  end
end
