describe('Queries Test', () => {
  const explorer = new RouterExplorer('local', '0xeee');
  it('Fetch Blocks', async () => {
    const latestBlocks = await explorer.getLatestBlocks(1, 1);
    console.log('latestBlocks =>', JSON.stringify(latestBlocks));
    expect(latestBlocks).toBeDefined();
  });
  it('Fetch individual block by its height', async () => {
    const block = await explorer.getBlockByHeight(1);
    console.log('block =>', JSON.stringify(block));
    expect(block).toBeDefined();
  });
});
