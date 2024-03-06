import requests

class BlockchainClient:
    """
    A client for interacting with the Blockchain.com API.

    This class provides methods to retrieve information about Bitcoin addresses and transactions
    from the Blockchain.com API.

    API documentation: https://www.blockchain.com/explorer/api/blockchain_api
    """

    BASE_URL = "https://blockchain.info"

    def __init__(self):
        pass

    def get_address_info(self, bitcoin_address):
        """
        Retrieve information about a Bitcoin address.

        Args:
            bitcoin_address (str): The Bitcoin address to retrieve information for.

        Returns:
            dict: A dictionary containing information about the Bitcoin address.

        API endpoint: https://blockchain.info/rawaddr/$bitcoin_address
        - Address can be base58 or hash160
        - Optional limit parameter to show n transactions e.g. &limit=50 (Default: 50, Max: 50)
        - Optional offset parameter to skip the first n transactions e.g. &offset=100 (Page 2 for limit 50)
        """
        url = f"{self.BASE_URL}/rawaddr/{bitcoin_address}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def get_balance(self, bitcoin_address):
        """
        Retrieve the balance of a Bitcoin address.

        Args:
            bitcoin_address (str): The Bitcoin address to retrieve the balance for.

        Returns:
            dict: A dictionary containing the balance information for the Bitcoin address.

        API endpoint: https://blockchain.info/balance?active=$address
        - Multiple Addresses Allowed separated by "|"
        - Address can be base58 or xpub
        - List the balance summary of each address listed.
        """
        url = f"{self.BASE_URL}/balance?active={bitcoin_address}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def get_transaction(self, tx_hash):
        """
        Retrieve information about a Bitcoin transaction.

        Args:
            tx_hash (str): The hash of the transaction to retrieve information for.

        Returns:
            dict: A dictionary containing information about the Bitcoin transaction.

        API endpoint: https://blockchain.info/rawtx/$tx_hash
        - You can also request the transaction to return in binary form (Hex encoded) using ?format=hex
        """
        url = f"{self.BASE_URL}/rawtx/{tx_hash}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None

client = BlockchainClient()
