import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import ActivityNormal from '../src/components/ui/ActivityNormal';
import ActivityList from '../src/components/ui/ActivityList';
import WeekActivity from '../src/components/ui/WeekActivity';
import ActivityModal from '../src/components/ui/ActivityModal';
import GoalModal from '../src/components/ui/GoalModal';
import Dashboard from '../src/components/ui/Dashboard';


/* ACTIVITY NORMAL */
describe('[ActivityNormal TEST]', () => {
  var testActivty = {
    'id': '12',
    'name': 'Match contre Federer',
    'date': '2017-08-29',
    'hour': '9',
    'duration': '2',
    'distance':  null,
    'description': 'Match avec Theo pour travailler le lift',
    'sport': 'Tennis',
    'activityType': 'competition',
    'status': false,
    'resultat': ''
  };

  beforeEach(() => {

  });

  it('it should have shallow render an ActivityNormal comp', () => {
    const wrapper = shallow(<ActivityNormal activity={testActivty}/>);
    expect(wrapper.find('Card')).to.have.length(1);
  });

  it('it should have render an ActivityNormal Checkbox comp', () => {
    const wrapper = mount(<ActivityNormal activity={testActivty}/>);
    expect(wrapper.find('Checkbox')).to.have.length(1);

  });

  it('it should have shallow render an ActivityNormal comp', () => {
    let clicked = false;
    const wrapper = shallow(
      <ActivityNormal
        activity={testActivty}
        onCheckActivity={()=>{clicked=true;}}
      />
    );

    wrapper.find('Checkbox').simulate('click');
    expect(clicked).to.equal(true);
  });
});


/* ACTIVITY LIST */
describe('[ActivityList TEST]', () => {


  beforeEach(() => {

  });

  it('it should have shallow render an ActivityList comp', () => {
    const testActivty = {
      'name': 'l\'activity test 1',
      'description': 'je suis une activity pour le test',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': false
    };

    const wrapper = shallow(<ActivityList activities={[testActivty]}/>);
    expect(wrapper.find('List')).to.have.length(1);

  });

  it('it should have shallow render an ActivityList Header comp', () => {
    const title = 'Test ActivityList';
    const wrapper = mount(<ActivityList name={title}/>);

    expect(wrapper.props().name).to.equal(title);

    expect(wrapper.find('Header')).to.have.length(1);

    expect(wrapper.find('Header').text()).to.equal(title);

  });

  it('it should have shallow render an ActivityList comp with activities', () => {

    const testActivity = {
      'name': 'l\'activity test 1',
      'description': 'je suis une activity pour le test',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': false
    };

    const testActivity2 = {
      'name': 'l\'activity test 2',
      'description': 'je suis une seconde activity pour le test',
      'goal': 'Test',
      'date': '01/02/2017',
      'duration': '3',
      'status': true
    };

    const activityList = [testActivity, testActivity2];

    const wrapper = shallow(
      <ActivityList
        name={'Test ActivityList'}
        activities={activityList}
      />
    );

    expect(wrapper.find('List')).to.have.length(1);

    expect(wrapper.find('ListItem')).to.have.length(2);

  });
});


/* WEEK ACTIVITY */
describe('[WeekActivity TEST]', () => {


  beforeEach(() => {

  });

  it('it should have shallow render an WeekActivity comp', () => {
    const wrapper = shallow(<WeekActivity/>);
    expect(wrapper.hasClass('WeekActivity')).to.equal(true);
  });

  it('it should have shallow render WeekActivity children comp', () => {
    const wrapper = shallow(<WeekActivity/>);
    expect(wrapper.find('Header')).to.have.length(1);

    expect(wrapper.find('Header').props().children).to.equal('Week activities');

    expect(wrapper.find('Grid')).to.have.length(1);

    expect(wrapper.find('ActivityList')).to.have.length(7);
  });

  it('it should have shallow render a WeekActivity comp with activities', () => {

    const testActivity = {
      'name': 'l\'activity test 1',
      'description': 'je suis une activity pour le test',
      'goal': 'Test',
      'date': moment().format('YYYY-MM-DD'),
      'duration': '2',
      'status': false
    };

    const testActivity2 = {
      'name': 'l\'activity test 2',
      'description': 'je suis une seconde activity pour le test',
      'goal': 'Test',
      'date': moment().format('YYYY-MM-DD'),
      'duration': '3',
      'status': true
    };

    const activityList = [testActivity, testActivity2];


    const wrapper = shallow(
      <WeekActivity
        activities={activityList}
      />
    );

    expect(wrapper.find('Grid')).to.have.length(1);

    expect(wrapper.find('ActivityList')).to.have.length(7);

  });

});


/* ACTIVITY MODAL */
describe('[ActivityModal TEST]', () => {

  var weekDate = moment();

  beforeEach(() => {

  });

  it('it should have shallow render an ActivityModal comp', () => {

    const wrapper = shallow(
      <ActivityModal
        weekDate={weekDate}
      />);
    expect(wrapper.find('.ActivityModal')).to.have.length(1);

  });

  it('it should have shallow rend an ActivityModal Modal comp', () => {
    const wrapper = shallow(
      <ActivityModal
        weekDate={weekDate}
      />);
    expect(wrapper.find('Modal')).to.have.length(1);

  });

  it('it should have shallow render an ActivityModal comp with goals props', () => {
    const onAddFunc = () => true == true;
    const goals = ['Test', 'Sport'];
    const wrapper = mount(
      <ActivityModal
        weekDate={weekDate}
        goals={goals}
        onAddActivity={onAddFunc}
      />);

    expect(wrapper.props().weekDate).to.equal(weekDate);
    expect(wrapper.props().goals).to.equal(goals);
    expect(wrapper.props().onAddActivity).to.equal(onAddFunc);

  });



  // TODO more accurate test
});


/* GOAL MODAL */
describe('[GoalModal TEST]', () => {


  beforeEach(() => {

  });

  it('it should have shallow render an GoalModal comp', () => {

    const wrapper = shallow( <GoalModal 	/> );
    expect(wrapper.find('.GoalModal')).to.have.length(1);

  });

  it('it should have shallow rend an GoalModal Modal comp', () => {
    const wrapper = shallow( <GoalModal 	/> );
    expect(wrapper.find('Modal')).to.have.length(1);

  });

  it('it should have shallow render an GoalModal comp with onAddGoal props', () => {
    const onAddFunc = () => true == true;
    const wrapper = mount(
      <GoalModal
        onAddGoal={onAddFunc}
      />
    );

    expect(wrapper.props().onAddGoal).to.equal(onAddFunc);
  });

  // TODO more accurate test
});


/* DASHBOARD */
describe('[Dashboard TEST]', () => {


  beforeEach(() => {

  });

  it('it should have shallow render an Dashboard comp', () => {

    const wrapper = shallow( <Dashboard /> );
    expect(wrapper.find('.Dashboard')).to.have.length(1);

  });

  it('it should have shallow render Dashboard Headers comp', () => {

    const tempGoals = [
      {
        'id': '0',
        'name': 'Objectif tennis',
        'startingdate': '2017-08-01',
        'deadline': '2017-09-10',
        'sport': 'Tennis',
        'target': '6',
        'goaltype': 'duration'
      },
      {
        'id': '1',
        'name': '10 seance de running',
        'startingdate': '2017-08-01',
        'deadline': '2017-08-31',
        'sport': 'running',
        'target': '10',
        'goaltype': 'distance'
      }
    ];


    const wrapper = shallow( <Dashboard
      goals={tempGoals}
      activities={[]}
    /> );

    expect(wrapper.find('Tab')).to.have.length(1);

  });




  // TODO more test on dashboard utility function AND nested comp
});
