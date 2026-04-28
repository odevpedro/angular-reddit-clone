import { TestBed } from '@angular/core/testing';
import { SubredditService } from './subreddit.service';
import { firstValueFrom } from 'rxjs';

describe('SubredditService', () => {
  let service: SubredditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubredditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should return all mock subreddits', async () => {
    const subs = await firstValueFrom(service.getAll());
    expect(subs.length).toBeGreaterThan(0);
  });

  it('getByName should return the matching subreddit', async () => {
    const sub = await firstValueFrom(service.getByName('angular'));
    expect(sub?.name).toBe('angular');
    expect(sub?.title).toContain('Angular');
  });

  it('getByName should return undefined for an unknown subreddit', async () => {
    const sub = await firstValueFrom(service.getByName('doesnotexist'));
    expect(sub).toBeUndefined();
  });

  describe('formatMemberCount', () => {
    it('should format counts >= 1M as X.XM', () => {
      expect(service.formatMemberCount(1_500_000)).toBe('1.5M');
      expect(service.formatMemberCount(5_200_000)).toBe('5.2M');
    });

    it('should format counts >= 1000 as X.Xk', () => {
      expect(service.formatMemberCount(245_800)).toBe('245.8k');
      expect(service.formatMemberCount(1000)).toBe('1.0k');
    });

    it('should return raw number string for counts below 1000', () => {
      expect(service.formatMemberCount(500)).toBe('500');
      expect(service.formatMemberCount(0)).toBe('0');
    });
  });
});
