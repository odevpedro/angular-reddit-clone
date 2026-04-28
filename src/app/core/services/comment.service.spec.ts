import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { firstValueFrom } from 'rxjs';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getByPost should return only comments for the given post', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    expect(comments.length).toBeGreaterThan(0);
    expect(comments.every(c => c.postId === '1')).toBeTrue();
  });

  it('getByPost should return root-level comments at the top level', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    expect(comments.every(c => c.parentId === null)).toBeTrue();
  });

  it('getByPost should nest replies under their parent', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    const hasNestedReplies = comments.some(c => c.replies.length > 0);
    expect(hasNestedReplies).toBeTrue();
  });

  it('getByPost should return empty array for post with no comments', async () => {
    const comments = await firstValueFrom(service.getByPost('nonexistent'));
    expect(comments).toEqual([]);
  });

  it('addComment should append a new root comment', async () => {
    const before = await firstValueFrom(service.getByPost('1'));
    service.addComment('1', null, 'Test comment', 'tester');
    const after = await firstValueFrom(service.getByPost('1'));
    expect(after.length).toBe(before.length + 1);
  });

  it('addComment should set correct fields on the new comment', async () => {
    service.addComment('1', null, 'Hello world', 'testuser');
    const comments = await firstValueFrom(service.getByPost('1'));
    const added = comments.find(c => c.body === 'Hello world')!;
    expect(added.author).toBe('testuser');
    expect(added.postId).toBe('1');
    expect(added.parentId).toBeNull();
    expect(added.userVote).toBe(1);
    expect(added.score).toBe(1);
  });

  it('addComment with parentId should appear as a reply of the parent', async () => {
    const before = await firstValueFrom(service.getByPost('1'));
    const parent = before[0];
    service.addComment('1', parent.id, 'Reply text', 'replier');
    const after = await firstValueFrom(service.getByPost('1'));
    const updatedParent = after.find(c => c.id === parent.id)!;
    const reply = updatedParent.replies.find(r => r.body === 'Reply text');
    expect(reply).toBeDefined();
    expect(reply?.author).toBe('replier');
  });

  it('vote should increase comment score', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    const target = comments[0];
    service.vote(target.id, 1);
    const updated = (await firstValueFrom(service.getByPost('1'))).find(c => c.id === target.id)!;
    expect(updated.score).toBe(target.score + 1);
    expect(updated.userVote).toBe(1);
  });

  it('vote should decrease comment score', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    const target = comments[0];
    service.vote(target.id, -1);
    const updated = (await firstValueFrom(service.getByPost('1'))).find(c => c.id === target.id)!;
    expect(updated.score).toBe(target.score - 1);
    expect(updated.userVote).toBe(-1);
  });

  it('voting the same direction twice should toggle the vote off', async () => {
    const comments = await firstValueFrom(service.getByPost('1'));
    const target = comments[0];
    service.vote(target.id, 1);
    service.vote(target.id, 1);
    const updated = (await firstValueFrom(service.getByPost('1'))).find(c => c.id === target.id)!;
    expect(updated.score).toBe(target.score);
    expect(updated.userVote).toBe(0);
  });
});
