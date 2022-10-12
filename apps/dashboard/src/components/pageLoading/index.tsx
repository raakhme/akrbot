import { Box, Container, Progress, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export interface PageLoadingProps {
  loading?: boolean;
  label?: string;
}

export const PageLoading = ({
  loading,
  children,
  label,
}: PropsWithChildren<PageLoadingProps>) => {
  return loading ? (
    <Box display="flex" h="100vh" alignItems="center">
      <Container textAlign="center">
        <Progress size="sm" isIndeterminate borderRadius={10} />
        {label && (
          <Text mt="8px" fontSize={12}>
            {label}
          </Text>
        )}
      </Container>
    </Box>
  ) : (
    (children as JSX.Element)
  );
};
