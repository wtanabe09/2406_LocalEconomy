import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { PrefEconomy } from './PrefEconomy';
import { usePrefContext } from '../contexts/usePrefContext';

jest.mock('../contexts/usePrefContext');

const mockPrefectures = [
  { id: 1, name: 'Hokkaido', checked: false },
  { id: 2, name: 'Tokyo', checked: false },
];

const populations = {
  result: {
    data: [
      { label: '総人口', data: [{ year: '2020', value: 500000 }] },
      { label: '年少人口', data: [{ year: '2020', value: 100000 }] },
      { label: '生産年齢人口', data: [{ year: '2020', value: 300000 }] },
      { label: '老年人口', data: [{ year: '2020', value: 100000 }] },
    ],
  },
}
const dataPopulationMock = () =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ populations: populations })
    })
  }
);

beforeEach(() => {
  usePrefContext.mockReturnValue({
    prefectures: mockPrefectures,
    setPrefectures: jest.fn(),
  });
  global.fetch = jest.fn().mockImplementation(dataPopulationMock);
  fetchMock.resetMocks();
});

describe("PrefEconomy", () => {
  test('renders prefectures and buttons', async () => {
    render(<PrefEconomy />);
  
    expect(screen.getByText('Prefectures')).toBeInTheDocument();
    mockPrefectures.forEach(prefecture => {
      expect(screen.getByText(prefecture.name)).toBeInTheDocument();
    });
  
    expect(screen.getByText('Graph')).toBeInTheDocument();
  
    expect(screen.getByText('Button loading')).toBeInTheDocument();
  });

  test('render buttons', async () => {
    render(<PrefEconomy />);
  
    await waitFor(() => {
      expect(screen.getByText('総人口')).toBeInTheDocument();
      expect(screen.getByText('年少人口')).toBeInTheDocument();
      expect(screen.getByText('生産年齢人口')).toBeInTheDocument();
      expect(screen.getByText('老年人口')).toBeInTheDocument();
    })
  })

  test('handles checkbox toggle and fetches population data', async () => {

    render(<PrefEconomy />);

    const hokkaidoCheckbox = screen.getByLabelText('Hokkaido');
    fireEvent.click(hokkaidoCheckbox);

    waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith('/api/population?prefCode=1');
    });
    
  });

})
