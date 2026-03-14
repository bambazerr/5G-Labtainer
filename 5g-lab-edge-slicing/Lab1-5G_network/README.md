[TP 5G Guide PDF](Lab1-5G_network/5G-lab.pdf.pdf)


# 5G Lab 1 - Open5GS and UERANSIM

## Objective
Become familiar with the operation of a 5G network, from the attachment process of a User Equipment (UE) to data transmission.
## Prerequisites
- **Labtainer** must be installed and configured, as the lab is entirely executed in this environment.
- Download the project '5g-lab.tgz" and install in Labtainer.
## Lab Architecture  
- **5G CORE**: Open5GS deployed across several containers representing AMF, SMF, UPF, AUSF, UDM, UDR, PCF, BSF, SCP, and NRF.  
- **5G RAN**: One gNB container plus UE containers (**ue1**, **ue2**) simulated using **UERANSIM**.  
- **Subscriber**: A container including MongoDB for managing subscribers and a WebUI interface for adding new ones.

## Steps to Follow

### 1. Launch the Lab  
From Labtainer:
```
rebuild.py 5g-lab
```
Three terminals will open: CORE, RAN, and Subscriber.

### 2. Add a Subscriber

From the Subscriber container, open Firefox and connect to the WebUI:
http://172.22.0.2:9999
```
Utilisateur : admin

Mot de passe : 1423
```
Add a subscriber for ue1 and ue2 using the provided IMSI/K/OP information.
You can also check the configuration files:
```
/ueransim/config/open5gs-ue1.yaml

/ueransim/config/open5gs-ue2.yaml
```
### 3. Start Wireshark

From the gNB container:
wireshark


Select the any interface, start the capture, and apply the filter:

Filtrer avec : rls.message_type=4 and rls.message_type=5 and ipv6

### 4. Simulate a UE

In the ue1 and ue2 containers:
```
sudo /ueransim/bin/nr-ue -c /ueransim/config/open5gs-ue1.yaml&

sudo /ueransim/bin/nr-ue -c /ueransim/config/open5gs-ue2.yaml&
```
### 5. Configure the User Tunnel

Replace X with the dynamically assigned IP address of the UE:
```
sudo ip route add 192.168.100.1 via 192.168.100.X dev uesimtun0
sudo route add default gw 192.168.100.X
```
### 6. Test Connectivity

From ue1 or ue2:
```
ping -I uesimtun0 192.168.100.1
ping -I uesimtun0 google.com
```
### 7. Analyze Exchanges in Wireshark

Check the following messages:

- [ Registration Request / Accept] 

- [Authentication Request / Response ] 

- [ Security Mode Command / Complete] 

- [PDU Session Establishment ] 


## Files and Documents

5G-lab.pdf
5G-lab.tgz


## Authors

Khadim BA, Philippe JAILLON

## Remarks

This lab is executed only within the Labtainer environment.
All scripts and services are preconfigured.
The goal is to observe and understand the interactions between the core network, gNB, and UEs.