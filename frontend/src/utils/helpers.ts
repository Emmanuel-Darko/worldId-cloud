export function shortenAddress(address: string, startLength: number = 6, endLength: number = 4): string {
    // Validate the address (ensure it's a valid Ethereum address)
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error("Invalid Ethereum address");
    }
  
    // Get the first `startLength` characters (after "0x")
    const start = address.slice(0, startLength + 2); // Including the "0x" part
  
    // Get the last `endLength` characters
    const end = address.slice(-endLength);
  
    // Combine and return the shortened address
    return `${start}...${end}`;
}