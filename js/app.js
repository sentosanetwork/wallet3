document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            document.getElementById('walletAddress').innerText = account;
            document.getElementById('walletInfo').style.display = 'block';

            const web3 = new Web3(window.ethereum);

            const ethBalance = await web3.eth.getBalance(account);
            document.getElementById('ethBalance').innerText = web3.utils.fromWei(ethBalance, 'ether');

            const usdtContract = new web3.eth.Contract([
                {
                    "constant": true,
                    "inputs": [{ "name": "_owner", "type": "address" }],
                    "name": "balanceOf",
                    "outputs": [{ "name": "balance", "type": "uint256" }],
                    "type": "function"
                }
            ], '0xdAC17F958D2ee523a2206206994597C13D831ec7');

            const usdtBalance = await usdtContract.methods.balanceOf(account).call();
            document.getElementById('usdtBalance').innerText = (usdtBalance / 1e6).toFixed(6);

        } catch (error) {
            console.error(error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this app.');
    }
});
