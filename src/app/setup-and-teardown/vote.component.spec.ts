import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {

  let component: VoteComponent;

  // Usiamo questo metodo perchè ogni test(it()) dovrebbe essere isolato, cioè l'impatto di un it su quel componente non dovrebbe riflettere sugli altri
  beforeEach(() => { // Questo metodo viene eseguito prima di ogni test
    component = new VoteComponent(); // Arrange
  });

  it('should increment totalVotes when upvoted', () => {
    component.upVote(); // Act
    expect(component.totalVotes).toBe(1); // Assert
  });

  it('should decrement totalVotes when downvotes', () => {
    component.downVote(); // Act
    expect(component.totalVotes).toBe(-1); // Assert
  });
});
