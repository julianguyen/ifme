# frozen_string_literal: true
describe MomentsHelper, type: :controller do
  let(:user) { create(:user1) }
  let(:moment) { FactoryBot.create(:moment, :with_secret_share, user: user) }

  controller(MomentsController) do
  end

  describe '#secret_share_props' do
    it 'returns the correct input' do
      input = { inputs: [
        {
          id: 'secretShare',
          type: 'text',
          name: 'secretShare',
          label: I18n.t('moments.secret_share.singular'),
          readOnly: true,
          value: secret_share_url(moment.secret_share_identifier),
          dark: true,
          copyOnClick: I18n.t('moments.secret_share.link_copied')
        }
      ], action: moment_path(moment) }
      expect(controller.secret_share_props(moment)).to eq(input)
    end
  end

  describe '#present_moment_or_strategy' do
    context 'for a moment' do
      let(:moment) { create(:moment, user: user) }
      subject { controller.present_moment_or_strategy(moment) }
      it 'returns correct data' do
        expect(subject.keys).to include(:name, :link, :actions, :storyType, :date)
        expect(subject[:link]).to eq(moment_path(moment))
        expect(subject[:name]).to eq(moment[:name])
      end
    end

    context 'for a strategy' do
      let(:strategy) { create(:strategy, user: user) }
      subject { controller.present_moment_or_strategy(strategy) }
      it 'returns correct data' do
        expect(subject.keys).to include(:name, :link, :actions, :storyType, :date)
        expect(subject[:link]).to eq(strategy_path(strategy))
        expect(subject[:name]).to eq(strategy[:name])
      end
    end
  end

  describe '#resources_url_tags' do
    let(:user) { create(:user1) }
    let(:moment) { create(:moment, name: 'tech industry', user: user) }
    output = 'filter[]=tech%20industry&'
    subject { controller.resources_url_tags(moment) }
    it 'returns a filtered tag of matched resources' do
      expect(subject).to eq(output)
    end
  end
end
