from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient('10.0.101.2', port=502)
client.connect()

print( "Write register 10" )
client.write_register(10,666)
print( "Read register 23 & 24" )
result = client.read_holding_registers(23,count=2)
print(result)

print( "Write coil 13 & 15" )
client.write_coil(13, True)
client.write_coil(15, True)
print( "Write coil 0 to 15" )
result = client.read_coils(address=0,count=16)
print(result)
client.close()
