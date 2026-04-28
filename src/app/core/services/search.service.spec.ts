import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { firstValueFrom } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search$ should start with an empty string', async () => {
    const query = await firstValueFrom(service.search$);
    expect(query).toBe('');
  });

  it('setQuery should update search$', async () => {
    service.setQuery('Angular');
    const query = await firstValueFrom(service.search$);
    expect(query).toBe('angular');
  });

  it('setQuery should trim leading and trailing whitespace', async () => {
    service.setQuery('  angular  ');
    const query = await firstValueFrom(service.search$);
    expect(query).toBe('angular');
  });

  it('setQuery should lowercase the query', async () => {
    service.setQuery('ANGULAR SIGNALS');
    const query = await firstValueFrom(service.search$);
    expect(query).toBe('angular signals');
  });

  it('clear should reset search$ to empty string', async () => {
    service.setQuery('angular');
    service.clear();
    const query = await firstValueFrom(service.search$);
    expect(query).toBe('');
  });
});
