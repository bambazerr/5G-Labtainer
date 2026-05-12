# 5G-labtainer_AMICMA5G

## 5g-lab : 5G network Deployment  
Basic Open5GS deployment.

## 5g-lab2 :  
Edge slicing with dual UPF architecture.

### Method to run labs on Labtainer :

These are two different labs, so you must use one of the folders to run a lab in Labtainer.

To move into lab directory:
```

cd ~/labtainer/trunk/labs/

```

Note:
The sys.tar binaries are not pushed because they are too large.

So the lab folders are not complete in this repository (full version is only available in `.tgz` files).

Download `5g-lab2.tgz` and install it on Labtainer.

---

# Technical Documentation: 5G lab Deployment (Open5GS + UERANSIM) on Labtainer

# 1. Overview: How the lab is made possible

The 5G TP is based on:

1. Labtainer (educational orchestrator)
2. Docker (container virtualization)
3. Open5GS (5G Core)
4. UERANSIM (gNB + UE simulator)

The TP relies on Docker as container engine.

Key points:

- Creation of lab (newlab 5g-lab)
- Creation of containers (amf, smf, upf, gnb, ue, etc.)
- Network configuration via start.config
- Docker image build via Dockerfiles
- Binary injection via sys.tar
- Automatic startup via rc.local

---

# 2. Lab creation

## Install Labtainer VM

Use official image:
https://nps.edu/web/c3o/virtual-machine-images

## Create lab

```

newlab 5g-lab

```

Then create containers:
```

new_lab_setup.py -a amf

```

(do the same for others)

---

# 3. Virtual network architecture

File:
```

/labtainer/trunk/labs/5g-lab/config/start.config

```

Example:
```

NETWORK CORE
MASK 172.22.0.0/24
GATEWAY 172.22.0.101

NETWORK RAN
MASK 172.25.0.0/24
GATEWAY 172.25.0.101

```

CORE → 5G Core network  
RAN → Radio Access Network

---

# 4. Containers definition

Example:

```

CONTAINER amf
USER ubuntu
CORE 172.22.0.10
TERMINAL_GROUP CORE
TERMINALS 1
X11 YES
ADD-HOST CORE

```

Same for:
smf, upf, nrf, udm, udr, ausf, pcf, bsf, scp, gnb, ue1, ue2

---

# 5. Docker image build

Dockerfiles location:
```

/labtainer/trunk/labs/5g-lab/dockerfiles/

```

They:
- install dependencies
- copy system files
- define startup commands

---

# 6. Open5GS installation (5G Core)

## Principle

Open5GS is not compiled per container.  
It is injected using sys.tar.

## a. Extract binaries

```

tar xfz /mnt/hgfs/Documents/5GS.tgz

```

## b. Create archive

```

tar cvf open5gs.tar open5gs

```

## c. Inject into containers

Example (SMF):

```

cd smf/sys_tar/
rm sys.tar
ln ../../open5gs.tar sys.tar

```

Open5GS will be available in:
```

/open5gs/install/

```

---

# 7. UERANSIM deployment

## a. Inject sys.tar

```

cd ue1/sys_tar/
rm sys.tar
cp ~/labtainer/trunk/labs/5g-lab/ueransim.tar sys.tar

```

## b. Config files

Location:
```

labs/5g-lab/ueransim/config/

```

Copy to containers:

```

docker cp open5gs-gnb.yaml gnb:/ueransim/config/
docker cp open5gs-ue.yaml ue1:/ueransim/config/

```

---

# 8. Automation via rc.local

File:
```

/etc/rc.local

```

Make executable:

```

chmod +x /etc/rc.local

```

Example AMF:

```

wait_for () {
for S in $*
do
S=`echo $S | tr ":" " "`
while !(perl -e 'print "PRI * HTTP/2.0\r\n\r\n"' | nc -N $S) ; do sleep 1; done;
done
}

(
wait_for nrf:7777 nssf:7777
H=`hostname`
cd /open5gs/install/bin
./open5gs-${H}d > /var/log/$H.log 2>&1 &
)

exit 0

```

---

# Git commands

```

cd existing_repo
git remote add origin [https://gitlab.emse.fr/khadim.ba/5G-labtainer_AMICMA5G.git]
git branch -M main
git push -uf origin main

```

---

# Authors
Khadim BA, Philippe JAILLON

# Project status
In development
```

