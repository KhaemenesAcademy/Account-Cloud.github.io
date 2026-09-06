# Sovereign Runtime Plan

## Source stage

Build and review in:

`KhaemenesAcademy/Account-Cloud.github.io`

GitHub remains source/contract/testbed only.

## STOS intake stage

1. create sealed source ZIP;
2. import through STOS repository intake;
3. verify SHA/tree identity;
4. materialize read-only with Viaduct;
5. preserve source/runtime identity separately.

## Adapter stage

Read-only inspect the existing STOS storage primitives before implementing the adapter.

Target existing family:

- internal cloud
- storage fabric
- schema/instance wrappers

Do not create a competing generic storage subsystem unless the existing primitives are proven insufficient.

## Protected application stage

Target:

```text
Nexus
  -> Buddy
  -> Klik
  -> Avouch
  -> Account Cloud authority
  -> STOS storage fabric
```

## Acceptance stage

Use synthetic family/adult/learner records first.

Real family/student data is prohibited until the synthetic cross-device gate is sealed.
