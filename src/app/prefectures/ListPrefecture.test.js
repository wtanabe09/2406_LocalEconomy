import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { ListPrefecture } from './ListPrefecture';
import { usePrefContext } from '../contexts/usePrefContext';

jest.mock('../contexts/usePrefContext');

const mockPrefectures = [
  { id: 1, name: 'Hokkaido', checked: false },
  { id: 2, name: 'Tokyo', checked: false },
];

beforeEach(() => {
  usePrefContext.mockReturnValue({
    prefectures: mockPrefectures,
    setPrefectures: jest.fn(),
  });
  fetchMock.resetMocks();
});

describe("ListPrefecture", () => {
  test('renders prefectures and buttons', () => {
    render(<ListPrefecture />);
  
    expect(screen.getByText('Prefectures')).toBeInTheDocument();
    mockPrefectures.forEach(prefecture => {
      expect(screen.getByText(prefecture.name)).toBeInTheDocument();
    });
  
    expect(screen.getByText('Graph')).toBeInTheDocument();
    expect(screen.getByText('総人口')).toBeInTheDocument();
    expect(screen.getByText('年少人口')).toBeInTheDocument();
    expect(screen.getByText('生産年齢人口')).toBeInTheDocument();
    expect(screen.getByText('老年人口')).toBeInTheDocument();
  });




test('handles checkbox toggle and fetches population data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    populations: {
      result: {
        data: [
          { label: '総人口', data: [{ year: '2020', value: 500000 }] },
          { label: '年少人口', data: [{ year: '2020', value: 100000 }] },
          { label: '生産年齢人口', data: [{ year: '2020', value: 300000 }] },
          { label: '老年人口', data: [{ year: '2020', value: 100000 }] },
        ],
      },
    },
  }));


  render(<ListPrefecture />);

  const hokkaidoCheckbox = screen.getByLabelText('Hokkaido');
  fireEvent.click(hokkaidoCheckbox);

  waitFor(() => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/population?prefCode=1');
  });
  
});

})
