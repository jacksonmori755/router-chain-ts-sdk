import { RouterExplorer } from '../src';

describe('Queries Test', () => {
  const explorer = new RouterExplorer('local', '0xeee');

  // it('Fetch Blocks', async () => {
  //   const latestBlocks = await explorer.getLatestBlocks(10, 5);
  //   console.log('latestBlocks =>', JSON.stringify(latestBlocks));
  //   expect(latestBlocks).toBeDefined();
  // });
  // it('Fetch individual block by its height', async () => {
  //   const block = await explorer.getBlockByHeight(6465);
  //   console.log('block =>', JSON.stringify(block));
  //   expect(block).toBeDefined();
  // });
  // it('Fetch Transaction', async () => {
  //   const latestTransactions = await explorer.getLatestTransactions(10, 1);
  //   console.log('latestTransactions =>', JSON.stringify(latestTransactions));
  //   expect(latestTransactions).toBeDefined();
  // });
  // it('Fetch individual transaction by its hash', async () => {
  //   const transaction = await explorer.getTransactionByHash(
  //     'A987ABDE0AFA803F3C2AC816C8995F54C0CF4CCE10427CAF2E38F5F6206A5A3F'
  //   );
  //   console.log('transaction =>', JSON.stringify(transaction));
  //   expect(transaction).toBeDefined();
  // });
  // it('Fetch Inbound', async () => {
  //   const latestInbounds = await explorer.getLatestInbounds(10, 1);
  //   console.log('latestInbounds =>', JSON.stringify(latestInbounds));
  //   expect(latestInbounds).toBeDefined();
  // });
  it('Fetch individual inbound by its formAttestationId', async () => {
    const inbound = await explorer.getInboundByAttestationId(
      'CHAIN_TYPE_EVM-1-2'
    );
    console.log('Inbound =>', JSON.stringify(inbound));
    expect(inbound).toBeDefined();
  });
});
