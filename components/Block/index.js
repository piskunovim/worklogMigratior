import styled from 'styled-components';

const Block = styled.div`
    display: ${({ type }) => (type || 'block')};
`;

export default Block;