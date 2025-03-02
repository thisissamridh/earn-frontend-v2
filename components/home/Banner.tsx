import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

// const slate = '#1E293B';

function DesktopBanner() {
  const router = useRouter();
  return (
    <Box
      w={'100%'}
      h={72}
      mb={8}
      mx={'auto'}
      p={10}
      bgImage="url('/assets/home/display/money_banner.png')"
      bgSize={'cover'}
      rounded={'md'}
    >
      <Text
        color={'brand.slate.800'}
        fontFamily={'Domine'}
        fontSize={'1.625rem'}
        fontWeight={'700'}
        lineHeight={'1.875rem'}
      >
        Start Earning Crypto
        <br /> by Contributing to Solana
      </Text>
      <Text w={'60%'} mt={'0.4375rem'} color={'brand.slate.500'}>
        Explore bounties, grants, and jobs with high growth startups in the
        Solana ecosystem.
      </Text>
      <Flex align={'center'} mt={'1.5625rem'}>
        <Button
          px={'2.25rem'}
          py={'0.75rem'}
          color={'white'}
          fontSize={'0.875rem'}
          bg={'#6366F1'}
          onClick={() => {
            router.push('/new');
          }}
        >
          Sign Up
        </Button>
        <AvatarGroup ml={'2.875rem'} max={3} size="sm">
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        </AvatarGroup>
        <Text ml={'0.6875rem'} fontSize={'0.875rem'}>
          Join 563+ others
        </Text>
      </Flex>
    </Box>
  );
}

function MobileBanner() {
  const router = useRouter();
  return (
    <Flex
      justify={'end'}
      direction={'column'}
      w={'95%'}
      h={'96'}
      mx={'auto'}
      px={10}
      py={3}
      bgImage="url('/assets/home/display/mob_money_banner.png')"
      bgSize={'cover'}
      rounded={'md'}
    >
      <Text
        color={'brand.slate.500'}
        fontFamily={'Domine'}
        fontSize={'xl'}
        fontWeight={'700'}
      >
        Unlock Your Earning <br />
        Potential on Solana
      </Text>
      <Text
        w={'100%'}
        mt={'0.4375rem'}
        color={'brand.slate.800'}
        fontSize={'sm'}
      >
        Explore bounties, grants, and job opportunities for developers and
        non-technical talent alike
      </Text>
      <Flex align={'center'} direction={'column'} mt={'1.5625rem'}>
        <Button
          w={'100%'}
          px={'2.25rem'}
          py={'0.75rem'}
          color={'white'}
          fontSize={'sm'}
          bg={'#6366F1'}
          onClick={() => {
            router.push('/new');
          }}
        >
          Sign Up
        </Button>
        <Flex align={'center'} mt={5}>
          <AvatarGroup ml={'2.875rem'} max={3} size="sm">
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          </AvatarGroup>
          <Text ml={'0.6875rem'} fontSize={'0.875rem'}>
            Join 563+ others
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function Banner() {
  const [isLessThan768px] = useMediaQuery('(max-width: 768px)');
  return !isLessThan768px ? <DesktopBanner /> : <MobileBanner />;
}
