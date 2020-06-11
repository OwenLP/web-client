import {
  IPostListContainerProps,
  PostListContainer
} from "components/conversation/post-list/post-list.container";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useIsOpen from "hooks/is-open.hook";
import React, { useEffect } from "react";

interface Props extends IPostListContainerProps {
  inputPlaceholder?: string;
  showInput?: boolean;
}

const _PostListWithInput: React.FC<Props> = ({
  inputPlaceholder,
  showInput,
  id,
  fetchMethod
}) => {
  const [isReset, setReset, setNotReset] = useIsOpen();

  useEffect(() => {
    if (isReset) setNotReset();
  }, [isReset]);

  return (
    <div>
      {showInput && (
        <PostInputContainer
          placeholder={inputPlaceholder}
          userId={id}
          onSuccess={setReset}
        />
      )}
      <PostListContainer reset={isReset} id={id} fetchMethod={fetchMethod} />
    </div>
  );
};

export const PostListWithInput = React.memo(_PostListWithInput);
