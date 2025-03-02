import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import type { Wallet as SolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import Avatar from 'boring-avatars';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Login } from '@/components/modals/Login/Login';
import { userStore } from '@/store/user';

function UserInfo() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected, publicKey, wallet, wallets, select } = useWallet();
  const { setUserInfo, userInfo } = userStore();

  useEffect(() => {
    const makeUser = async () => {
      if (publicKey && connected) {
        const publicKeyString = publicKey.toBase58() as string;
        const userDetails = await axios.post('/api/user/', {
          publicKey: publicKeyString,
        });
        if (!userDetails.data) {
          setUserInfo({ publicKey: publicKeyString });
        } else if (!userDetails.data.isVerified) {
          setUserInfo(userDetails.data);
        } else {
          setUserInfo(userDetails.data);
          onClose();
        }
      }
    };
    makeUser();
  }, [publicKey, connected]);

  const onConnectWallet = async (solanaWallet: SolanaWallet) => {
    try {
      select(solanaWallet.adapter.name);
    } catch (e) {
      console.log('Wallet not found');
    }
  };

  const onDisconnectWallet = async () => {
    if (wallet == null) {
      return;
    }
    await wallet.adapter.disconnect();
    setUserInfo({});
  };

  return (
    <>
      {!!isOpen && (
        <Login
          wallets={wallets}
          onConnectWallet={onConnectWallet}
          isOpen={isOpen}
          onClose={onClose}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {connected ? (
        <>
          <Menu>
            <MenuButton minW={0} cursor={'pointer'} rounded={'full'}>
              <Flex align="center">
                {userInfo?.photo ? (
                  <Image
                    boxSize="32px"
                    borderRadius="full"
                    alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                    src={userInfo?.photo}
                  />
                ) : (
                  <Avatar
                    name={`${userInfo?.firstName} ${userInfo?.lastName}`}
                    colors={['#92A1C6', '#F0AB3D', '#C271B4']}
                    size={32}
                    variant="marble"
                  />
                )}
                <Box display={{ base: 'none', md: 'block' }} ml={2}>
                  {!userInfo?.firstName ? (
                    <Text color="brand.slate.800" fontSize="sm">
                      New User
                    </Text>
                  ) : (
                    <Text color="brand.slate.800" fontSize="sm">
                      {userInfo?.firstName}
                    </Text>
                  )}
                  <Text color="brand.slate.500" fontSize="xs">
                    {userInfo?.publicKey?.substring(0, 4)}
                    ....
                    {userInfo?.publicKey?.substring(
                      userInfo.publicKey.length - 4,
                      userInfo?.publicKey?.length
                    )}
                  </Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                color="brand.slate.500"
                fontSize="sm"
                fontWeight={600}
                onClick={() => {
                  router.push(`/t/${userInfo?.username}`);
                }}
              >
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem
                color="red.500"
                fontSize="sm"
                fontWeight={600}
                onClick={() => {
                  onDisconnectWallet();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button
            px={5}
            fontSize="xs"
            onClick={() => {
              onOpen();
            }}
            size="sm"
            variant={{ base: 'solid', md: 'ghost' }}
          >
            Login
          </Button>
          <Button
            display={{ base: 'none', md: 'block' }}
            px={4}
            fontSize="xs"
            onClick={() => {
              onOpen();
            }}
            size="sm"
            variant="solid"
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  );
}

export default UserInfo;
