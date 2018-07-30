import moment from 'moment';

const date = {
  state: {
    actualTime: moment()
  },
  mutations: {
    UPDATE_ACTUAL_TIME(state) {
      state.actualTime = moment();
    }
  }
}

export default date;
