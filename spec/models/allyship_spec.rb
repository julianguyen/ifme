# == Schema Information
#
# Table name: allies
#
#  id         :integer          not null, primary key
#  user_id1    :integer
#  created_at :datetime
#  updated_at :datetime
#  user_id2    :integer
#  status     :integer
#

require 'spec_helper'

describe Allyship do
	it "creates a valid ally relationship with accepted status" do
	  new_user1 = create(:user1)
	  new_user2 = create(:user2)
	  new_allies = create(:allyships_accepted, user_id: new_user1.id, ally_id: new_user2.id)
	  expect(Allyship.count).to eq(2)
	end

	it "creates a valid ally relationship with pending_from_user_id1 status" do
	  new_user1 = create(:user1)
	  new_user2 = create(:user2)
	  new_allies = create(:allyships_pending_from_user_id1, user_id: new_user1.id, ally_id: new_user2.id)
	  expect(Allyship.count).to eq(2)
	end

	it "creates a valid ally relationship with pending_from_user_id2 status" do
	  new_user1 = create(:user1)
	  new_user2 = create(:user2)
	  new_allies = create(:allyships_pending_from_user_id2, user_id: new_user1.id, ally_id: new_user2.id)
	  expect(Allyship.count).to eq(2)
	end

	it "creates an invalid ally relationship where users are identical" do
	  new_user1 = create(:user1)
	  new_allies = build(:allyships_accepted, user_id: new_user1.id, ally_id: new_user1.id)
	  expect(new_allies).to have(1).error_on(:user_id)
	end

	it "creates an invalid ally relationship where user1 is nil" do
	  new_user2 = create(:user2)
	  new_allies = build(:allyships_accepted, user_id: nil, ally_id: new_user2.id)
	  expect(new_allies).to have(1).error_on(:user_id)
	end

	it "creates an invalid ally relationship where user2 is nil" do
	  new_user1 = create(:user1)
	  new_allies = build(:allyships_accepted, user_id: new_user1.id, ally_id: nil)
	  expect(new_allies).to have(1).error_on(:ally_id)
	end
end
