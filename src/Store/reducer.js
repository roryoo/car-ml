const initialState = {
    formData: {
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      fuelType: '',
      transmission: '',
      bodyStyle: '',
      engineSize: ''
    }
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_FUEL_TYPE':
        return {
          ...state,
          formData: {
            ...state.formData,
            fuelType: action.fuelType
          }
        };
      case 'UPDATE_FORM_DATA':
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.name]: action.value
          }
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  