import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { firstValueFrom } from 'rxjs';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPosts should return all mock posts', async () => {
    const posts = await firstValueFrom(service.getPosts());
    expect(posts.length).toBeGreaterThan(0);
  });

  it('getById should return the matching post', async () => {
    const post = await firstValueFrom(service.getById('1'));
    expect(post?.id).toBe('1');
  });

  it('getById should return undefined for an unknown id', async () => {
    const post = await firstValueFrom(service.getById('unknown'));
    expect(post).toBeUndefined();
  });

  it('getBySubreddit should return only posts from the given subreddit', async () => {
    const posts = await firstValueFrom(service.getBySubreddit('angular'));
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every(p => p.subreddit === 'angular')).toBeTrue();
  });

  it('getBySubreddit should return empty array for unknown subreddit', async () => {
    const posts = await firstValueFrom(service.getBySubreddit('nonexistent'));
    expect(posts.length).toBe(0);
  });

  it('vote up should increase score by 1', async () => {
    const before = (await firstValueFrom(service.getById('1')))!;
    service.vote('1', 1);
    const after = (await firstValueFrom(service.getById('1')))!;
    expect(after.score).toBe(before.score + 1);
    expect(after.userVote).toBe(1);
  });

  it('vote down should decrease score by 1', async () => {
    const before = (await firstValueFrom(service.getById('1')))!;
    service.vote('1', -1);
    const after = (await firstValueFrom(service.getById('1')))!;
    expect(after.score).toBe(before.score - 1);
    expect(after.userVote).toBe(-1);
  });

  it('voting the same direction twice should toggle the vote off', async () => {
    const before = (await firstValueFrom(service.getById('1')))!;
    service.vote('1', 1);
    service.vote('1', 1);
    const after = (await firstValueFrom(service.getById('1')))!;
    expect(after.score).toBe(before.score);
    expect(after.userVote).toBe(0);
  });

  it('switching vote direction should update score by 2', async () => {
    const before = (await firstValueFrom(service.getById('1')))!;
    service.vote('1', 1);
    service.vote('1', -1);
    const after = (await firstValueFrom(service.getById('1')))!;
    expect(after.score).toBe(before.score - 1);
    expect(after.userVote).toBe(-1);
  });

  it('vote should not affect other posts', async () => {
    const before = (await firstValueFrom(service.getById('2')))!;
    service.vote('1', 1);
    const after = (await firstValueFrom(service.getById('2')))!;
    expect(after.score).toBe(before.score);
  });
});
