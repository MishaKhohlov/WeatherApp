// Не нашел способа тестировать приватную область, backbone events, и методы которые ничего не возвращают, также не могу заглянуть в область видимости методов.
import {searchModel} from '../component/settings_search/searchModel.js';
import {modelApp} from '../component/appModel/appModel.js';
import settings_townTemplate from '../component/settings_town/settings_townTemplate.js';
import settings_town_atcmplTemplate from '../component/settings_town/settings_town_atcmplTemplate.js';
import weather_daysTemplate from '../component/weather_days/weather_daysTemplate.js';

describe('Test', function () {

  it('get Previous Phase promises to be Defined', ()=> {
    modelApp.setPreviousPhase(0.2);
    expect(modelApp.getPreviousPhase()).toEqual(0.2);
  });

  it('get Autocomplite promises to be Promises', ()=> {
    expect(searchModel.getAutocomplite()).toEqual(jasmine.any(Promise));
  });

  it('Template town to be string', ()=> {
    var template = new settings_townTemplate();
    var obj = {
      weather_icon: 'test',
      temprature: 'test',
      city: 'test',
      weather: 'test'
    };
    var cityName = 'Kharkiv';
    var iter = 1;
    expect(template.renderTemplate(obj, iter, cityName)).toEqual(jasmine.any(String));
  });

  it('Autocomplite template town to be string', ()=> {
    var template = new settings_town_atcmplTemplate();
    var obj = {
      city: 'test',
      country: 'test'
    };
    var iter = 1;
    expect(template.renderTemplate(obj, iter)).toEqual(jasmine.any(String));
  });

  it('Weather days template town to be string', ()=> {
    var template = new weather_daysTemplate();
    var obj = {
      dayWeek: 'test',
      icon: 'test',
      minTemp: 'test',
      maxTemp: 'test',
      positionMin: 'test',
      positionMax: 'test'
    };
    expect(template.renderTemplate([obj, obj])).toEqual(jasmine.any(String));
  });

});

