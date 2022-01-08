def myPow(x, n):
        """
        :type x: float
        :type n: int
        :rtype: float
        """
        if x == float(0):
            return float(0)
        if n == 0:
            return float(1)
        if x == float(0) and n == 0:
            return 'Value undefined'
        if n < 0:
            n = abs(n)
            return (1/x)**n
        
        return float(x ** n)