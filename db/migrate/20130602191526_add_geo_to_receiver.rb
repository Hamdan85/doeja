# -*- encoding : utf-8 -*-
class AddGeoToReceiver < ActiveRecord::Migration
  def change
    add_column :receivers, :latitude, :float
    add_column :receivers, :longitude, :float
    add_column :receivers, :gmaps, :boolean
  end
end
