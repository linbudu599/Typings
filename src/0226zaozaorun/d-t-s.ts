// @ts-nocheck

function getTypeFromConditionalTypeNode(node: ConditionalTypeNode): Type {
  const links = getNodeLinks(node);
  if (!links.resolvedType) {
    const checkType = getTypeFromTypeNode(node.checkType);

    // 也是 TypeFlags，其实就是比较是不是 TypeParameter
    const isDistributive = !!(checkType.flags & TypeFlags.TypeParameter);

    const isDistributionDependent =
      isDistributive &&
      (isTypeParameterPossiblyReferenced(
        checkType as TypeParameter,
        node.trueType
      ) ||
        isTypeParameterPossiblyReferenced(
          checkType as TypeParameter,
          node.falseType
        ));
    const aliasSymbol = getAliasSymbolForTypeNode(node);
    const aliasTypeArguments = getTypeArgumentsForAliasSymbol(aliasSymbol);
    const allOuterTypeParameters = getOuterTypeParameters(
      node,
      /*includeThisTypes*/ true
    );
    const outerTypeParameters = aliasTypeArguments
      ? allOuterTypeParameters
      : filter(allOuterTypeParameters, (tp) =>
          isTypeParameterPossiblyReferenced(tp, node)
        );
    const root: ConditionalRoot = {
      node,
      checkType,
      extendsType: getTypeFromTypeNode(node.extendsType),
      isDistributive,
      isDistributionDependent,
      inferTypeParameters: getInferTypeParameters(node),
      outerTypeParameters,
      instantiations: undefined,
      aliasSymbol,
      aliasTypeArguments,
    };
    links.resolvedType = getConditionalType(root, /*mapper*/ undefined);
    if (outerTypeParameters) {
      root.instantiations = new Map<string, Type>();
      root.instantiations.set(
        getTypeListId(outerTypeParameters),
        links.resolvedType
      );
    }
  }
  return links.resolvedType;
}
