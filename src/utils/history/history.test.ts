import RESTful from '@components/restfulLayout/types.ts';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import { saveToHistory } from '@/utils/history/history.ts';

const data: RESTful = {
  method: RESTful_METHODS.GET,
  headers: {
    selected: [
      {
        isSelected: true,
      },
      {
        isSelected: true,
      },
    ],
    keys: [
      {
        key: 'Content-Type',
      },
      {
        key: 'Test-Key',
      },
    ],
    values: [
      {
        value: 'application/json',
      },
      {
        value: 'Test-Value',
      },
    ],
  },
  body: '{"test":"test"}',
  baseURL: 'test.com',
  variables: {
    keys: [],
    values: [],
  },
};

const expectedValue =
  '{"UnknownUser":[{"source":"GET","baseUrl":"test.com","url":"/GET/dGVzdC5jb20=/eyJ0ZXN0IjoidGVzdCJ9?Content-Type=application%2Fjson&Test-Key=Test-Value"}]}';

describe('History', () => {
  it('should prepare correct string', () => {
    const history = JSON.parse(saveToHistory(data, '{}'));
    delete history['UnknownUser'][0].executedAt;
    expect(JSON.stringify(history)).toBe(expectedValue);
  });
});
