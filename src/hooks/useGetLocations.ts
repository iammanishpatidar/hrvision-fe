import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';
import { useEffect, useState } from 'react';

export const useGetLocations = () => {
  const [countries, setCountries] = useState<Array<{ label: string; value: string }>>([]);

  // Company Address state variables
  const [states, setStates] = useState<Array<{ label: string; value: string }>>([]);
  const [cities, setCities] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();

  useEffect(() => {
    const countryList = Country.getAllCountries().map((country: ICountry) => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountries(countryList);
  }, []);

  // Load states for address when country changes
  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry).map((state: IState) => ({
        label: state.name,
        value: state.isoCode,
      }));
      setStates(stateList);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Load cities for address when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState).map((city: ICity) => ({
        label: city.name,
        value: city.name,
      }));
      setCities(cityList);
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  return {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    setSelectedCountry,
    setSelectedState,
  };
};
